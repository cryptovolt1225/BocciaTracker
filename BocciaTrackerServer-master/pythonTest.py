# import the necessary packages
from collections import deque
from imutils.video import VideoStream
import numpy as np
import argparse
import cv2
import imutils
import time
import math
import dis

# To use Inference Engine backend, specify location of plugins:
# export LD_LIBRARY_PATH=/opt/intel/deeplearning_deploymenttoolkit/deployment_tools/external/mklml_lnx/lib:$LD_LIBRARY_PATH



pts = deque(maxlen=64)

parser = argparse.ArgumentParser()
parser.add_argument(
    '--input', help='Path to image or video. Skip to capture frames from camera')
parser.add_argument(
    '--throw_type', help='one of three throw types  - underarm ,underarm-extension , upperarm  ')
parser.add_argument('--thr', default=0.1, type=float,
                    help='Threshold value for pose parts heat map')
parser.add_argument('--width', default=640, type=int,    #368
                    help='Resize input to specific width.')
parser.add_argument('--height', default=480, type=int,   #368
                    help='Resize input to specific height.')
parser.add_argument(
    '--videoFileName', help='file name to save in mongoDB with')
parser.add_argument('--side', default= "right",   
                    help='the player throw  the ball  with his left or right arm.')
parser.add_argument('--ballColor', default = "red", 
                    help='Color of the ball "red" or "blue" ')

args = parser.parse_args()

BODY_PARTS = {"Nose": 0, "Neck": 1, "RShoulder": 2, "RElbow": 3, "RWrist": 4,
              "LShoulder": 5, "LElbow": 6, "LWrist": 7, "RHip": 8, "RKnee": 9,
              "RAnkle": 10, "LHip": 11, "LKnee": 12, "LAnkle": 13, "REye": 14,
              "LEye": 15, "REar": 16, "LEar": 17, "Background": 18}

if args.side == "left":
    POSE_PAIRS = [ ["LShoulder", "LElbow"],["LElbow", "LWrist"],["LShoulder","LHip"]]
else:
    POSE_PAIRS = [ ["RShoulder", "RElbow"],["RElbow", "RWrist"],["RShoulder","RHip"]] #, ["LShoulder", "LElbow"], ["LElbow", "LWrist"], ]


if args.ballColor == "red":
    # red
    redLower = (150, 40, 80)
    redUpper = (218, 155, 160)

# # red
# redLower = (0, 57, 45)
# redUpper = (9, 206, 238)

inWidth = args.width
inHeight = args.height

net = cv2.dnn.readNetFromTensorflow("graph_opt.pb")

cap = cv2.VideoCapture(args.input if args.input else 0)
fps = cap.get(cv2.CAP_PROP_FPS)
# print("Frames per second using video.get(cv2.CAP_PROP_FPS) : {0}\
#             spf : {1}".format(fps,1/fps))

#variables to write mp4 video file :
fourcc = cv2.VideoWriter_fourcc(*'MP4V')
outFile = cv2.VideoWriter('output2.mp4', -1, 20.0, (inWidth, inHeight)) 
#(640, 480)) # (640,352)))  

#global variables :
throwHasDetected = False
ballBeginThrowPosition = {"center":(0,0),"radius":0 }
mmInPixel = 0 ; 
shoulderPoint = None
ballDrawn = False
frameAfterthow = False
ballStartVelocity_MPS = 0 
center = None
newCenter = None
lastFrame = None
last_30_Frames = [] 
minElbowAngle = 0 
maxExtSholdAngl =0 
appendedFrameCounter = 0 
ballTrajectoryPoints = []
# min = 0
# minIndex = -1

def distance(pointA,pointB):
    """
    Calculate the distance between two points 
    params: point A , point B
    return : distance
    """
    return math.sqrt(abs(pointA[0]-pointB[0])**2+abs(pointA[1]-pointB[1])**2)

def angleFrom3poiintsDeg(point1,point2,center):
    """
       This function gets three points and return the 
       angle between the line point1 to center 
       and the line  point2 to center . Usinig 
       Law of cosines
       params: 3 points 
       return : angle in degree
    """
    a=distance(point1,point2)
    b=distance(point1,center)
    c=distance(point2,center)
    radian =math.acos((b**2+c**2-a**2)/(2*b*c))
    degree = radian*(180/math.pi)
    return degree

def findMinElbowAngle(last30Frames):
    """
    Loop through last 10 detected frames and find the minimum 
    elbow flexsion angle .
    Uses in the upperarm throw . 
    return: minimum angle and it's  index inn the list  
    """
    min = 360
    minIndex = -1
    for index,frameData in enumerate(last30Frames):
        if frameData and frameData["elbowAngle"]<min:
            min = frameData["elbowAngle"]
            minIndex = index
    return min,minIndex 


def findMaxShoulderExtAng(last30Frames, side_to_camera ="right"):
    """
    Loop through last 30 detected frames and find the maximum 
    shoulder wxtension angle . 
    Uses in the underarm throw . 
    side_to_camera: if player is sitting  with the "right" or "left" arm to the camera 
    return: maximum shoulder angle and it's  index inn the list  
    """
    maxAngle = 0 
    maxIndex = -1
    isExtansionAnge = False 

    # print('        last_30_Frames    ', last30Frames)
    for index,frameData in enumerate(last30Frames):

        if side_to_camera == "right" :
            isExtansionAnge =  frameData["ElbowPoint"][0] < frameData["HipPoint"][0]
        else :
            isExtansionAnge =  frameData["ElbowPoint"][0] > frameData["HipPoint"][0]

        print("isExtansionAnge" , isExtansionAnge)
        if frameData and isExtansionAnge and frameData["ShoulderAngle"] > maxAngle:
            maxAngle = frameData["ShoulderAngle"]
            maxIndex = index
    print("maxAngle = " ,maxAngle , "maxIndex = " , maxIndex)
    return maxAngle,maxIndex 
    

def findMaxBallHight():
    """
    Find the highest ball position related to shoulder in cm.
    return  : x and y of the highest ball position in cm  .
    """
    minPointY = inHeight
    minPointX = 0
    for ballPoint in ballTrajectoryPoints:
        if ballPoint[1] < minPointY and (abs(ballPoint[0] - shoulderPoint[0]) > 100 ):
            minPointY = ballPoint[1]
            minPointX = ballPoint[0]
    minPointXCm = (mmInPixel* (abs(shoulderPoint[0] - minPointX)))/10
    minPointYCm = (mmInPixel*(shoulderPoint[1] - minPointY))/10
    
    return minPointXCm ,minPointYCm

counterFrameAfterTrow = 0 



while  cv2.waitKey(1) < 0: # (cap.isOpened()):
    hasFrame, frame = cap.read()
    if not hasFrame:
        # cv2.waitKey()
        break
                 
    font = cv2.FONT_HERSHEY_SIMPLEX
    if(throwHasDetected):
        cv2.circle(frame, (ballBeginThrowPosition["center"][0], ballBeginThrowPosition["center"][1]), int(radius), (255, 100, 0), 2)
        ballDrawn = True
        counterFrameAfterTrow = counterFrameAfterTrow + 1
        if args.throw_type == "upperarm":
            #For upperarm throw  -  draw arm position at the time the elbow was
            # max flexsion  , and put text with  elbow angle flexsion at that time :
            if minElbowAngle == 0 :
                minElbowAngle,minIndex = findMinElbowAngle(last_30_Frames)
            if(minIndex != -1):
                cv2.line(frame, last_30_Frames[minIndex]["WristPoint"], last_30_Frames[minIndex]["ElbowPoint"], (0, 100, 100), 3)
                cv2.line(frame, last_30_Frames[minIndex]["ShoulderPoint"], last_30_Frames[minIndex]["ElbowPoint"], (0, 100, 100), 3) 
                cv2.putText(frame,f"Min Elbow Angle flexion = {format(minElbowAngle, '.2f')} deg. ",(last_30_Frames[minIndex]["ShoulderPoint"][0]-100, last_30_Frames[minIndex]["ShoulderPoint"][1]-100),font,  0.5, (0, 255, 255),2,cv2.LINE_8)
        else:        
            #For underarm throw  -  draw arm position at the time the shoulder was
            # max extansion  , and put text with shoulder and elbow angle at that time :   
            if maxExtSholdAngl == 0 :
                maxExtSholdAngl,maxIndex = findMaxShoulderExtAng(last_30_Frames) 
            if(maxIndex !=-1):
                cv2.line(frame, last_30_Frames[maxIndex]["WristPoint"], last_30_Frames[maxIndex]["ElbowPoint"], (50, 150, 200), 3)
                cv2.line(frame, last_30_Frames[maxIndex]["ShoulderPoint"], last_30_Frames[maxIndex]["ElbowPoint"], (50, 150, 200), 3) 
                cv2.putText(frame,f"Shoulder Extansion = {format(maxExtSholdAngl, '.2f')} deg. ",(last_30_Frames[maxIndex]["ShoulderPoint"][0]-90, last_30_Frames[maxIndex]["ShoulderPoint"][1]-120),font,  0.5, (50, 150, 200),2,cv2.LINE_8)        
                elbowExtAngle = last_30_Frames[maxIndex]["elbowAngle"]
                cv2.putText(frame,f"Elbow Extansion = {format(elbowExtAngle, '.2f')} deg. ",(last_30_Frames[maxIndex]["ShoulderPoint"][0]-80, last_30_Frames[maxIndex]["ShoulderPoint"][1]-100),font,  0.5, (50, 150, 200),2,cv2.LINE_8)        

        #Draw arm last detected position before the throw was detected ,
        # and put text with shoulder and elbow angle at that time :
        lastIndex = (appendedFrameCounter-1)%30
        cv2.line(frame, last_30_Frames[lastIndex]["WristPoint"], last_30_Frames[lastIndex]["ElbowPoint"], (200, 100, 30), 3)
        cv2.line(frame, last_30_Frames[lastIndex]["ShoulderPoint"], last_30_Frames[lastIndex]["ElbowPoint"], (200, 100, 30), 3) 
        shoulderLastAngle = last_30_Frames[lastIndex]["ShoulderAngle"]
        cv2.putText(frame,f"Shoulder flexsion = {format(shoulderLastAngle, '.2f')} deg. ",(last_30_Frames[lastIndex]["ShoulderPoint"][0]-90, last_30_Frames[lastIndex]["ShoulderPoint"][1]-70),font,  0.5, (200, 100, 30),2,cv2.LINE_8)        
        elbowLastAngle = last_30_Frames[lastIndex]["elbowAngle"]
        cv2.putText(frame,f"Elbow flexsion = {format(elbowLastAngle, '.2f')} deg. ",(last_30_Frames[lastIndex]["ShoulderPoint"][0]-80, last_30_Frames[lastIndex]["ShoulderPoint"][1]-50),font, 0.5,(200, 100, 30),2,cv2.LINE_8)       


        if(newCenter):
            cv2.putText(frame,f"vel = {format(ballStartVelocity_MPS, '.4f')} m/s",(ballBeginThrowPosition["center"][0]-5, ballBeginThrowPosition["center"][1]-25),font, 1, (0, 255, 255),2,cv2.LINE_4)
            
            lastFrame = frame
            # cv2.circle(frame, newCenter , int(radius), (255, 0, 255), 2)
    

    if(frameAfterthow and center and counterFrameAfterTrow == 2):
        newCenter = center
        XinMM = mmInPixel*distance(center,ballBeginThrowPosition["center"])
        # print("radius = ",radius , " center = ", center ," ballBeginThrowPosition['center'] = ",ballBeginThrowPosition["center"])
        XinM = XinMM/1000
        timeInSec =  (1/fps)*counterFrameAfterTrow
        ballStartVelocity_MPS = XinM/timeInSec
        # print(" mmInPixel  = " , mmInPixel , " XinMM = " , XinMM," XinM = ",XinM, " timeInSec = " ,timeInSec ," ball velocity = ", ballStartVelocity_MPS) 
        frameAfterthow = False
    # resize the frame, blur it, and convert it to the HSV
    # color space
    # frame = imutils.resize(frame, width=368)
    blurred = cv2.GaussianBlur(frame, (11, 11), 0)
    hsv = cv2.cvtColor(blurred, cv2.COLOR_BGR2HSV)
    # construct a mask for the color "green", then perform
    # a series of dilations and erosions to remove any small
    # blobs left in the mask
    mask = cv2.inRange(hsv, redLower, redUpper)
    mask = cv2.erode(mask, None, iterations=2)
    mask = cv2.dilate(mask, None, iterations=2)


    # find contours in the mask and initialize the current
    # (x, y) center of the ball
    cnts = cv2.findContours(mask.copy(), cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_SIMPLE)
    cnts = imutils.grab_contours(cnts)
    center = None
    # only proceed if at least one contour was found
    if len(cnts) > 0:
        # find the largest contour in the mask, then use
        # it to compute the minimum enclosing circle and
        # centroid
        c = max(cnts, key=cv2.contourArea)
        ((x, y), radius) = cv2.minEnclosingCircle(c)
        M = cv2.moments(c)
        center = (int(M["m10"] / M["m00"]), int(M["m01"] / M["m00"]))
        # only proceed if the radius meets a minimum size
        if radius > 1:
            # draw the circle and centroid on the frame,
            # then update the list of tracked points
            cv2.circle(frame, (int(x), int(y)), int(radius),
                (0, 255, 255), 2)
            cv2.circle(frame, center, 5, (0, 0, 255), -1)
            if(throwHasDetected):
                ballTrajectoryPoints.append(center)

    # update the points queue
    pts.appendleft(center)
        # loop over the set of tracked points
    for i in range(1, len(pts)):
        # if either of the tracked points are None, ignore
        # them
        if pts[i - 1] is None or pts[i] is None:
            continue
        # otherwise, compute the thickness of the line and
        # draw the connecting lines
        thickness = int(np.sqrt(64/ float(i + 1)) * 2.5)
        cv2.line(frame, pts[i - 1], pts[i], (0, 0, 255), thickness)

    frameWidth = frame.shape[1]
    frameHeight = frame.shape[0]
    # print("frame.shape[1] = ",frame.shape[1] ,"frame.shape[0] = ",frame.shape[0])
    net.setInput(cv2.dnn.blobFromImage(frame, 1.0, (inWidth, inHeight),
                 (127.5, 127.5, 127.5), swapRB=True, crop=False))
    out = net.forward()
    # MobileNet output [1, 57, -1, -1], we only need the first 19 elements
    out = out[:, :19, :, :]

    assert(len(BODY_PARTS) == out.shape[1])

    points = []
    for i in range(len(BODY_PARTS)):
        # Slice heatmap of corresponging body's part.
        heatMap = out[0, i, :, :]

        # Only a single pose at the same time
        # could be detected this way (a global one ).
        _, conf, _, point = cv2.minMaxLoc(heatMap)
        x = (frameWidth * point[0]) / out.shape[3]
        y = (frameHeight * point[1]) / out.shape[2]
        # Add a point if it's confidence is higher than threshold.
        points.append((int(x), int(y)) if conf > args.thr else None)

        #Right/Left arm switch:
    if(not throwHasDetected):
        if (args.side == "right"):
            shoulderPoint = points[2]
            elbowPoint = points[3]
            wristPoint = points[4] if ((args.throw_type != "upperarm") or points[4]) else center
            hipPoint = points[8]
        else:
            shoulderPoint = points[5]
            elbowPoint = points[6]
            wristPoint = points[7] if ((args.throw_type != "upperarm") or points[4]) else center
            hipPoint = points[11]

        for pair in POSE_PAIRS:
            partFrom = pair[0]
            partTo = pair[1]
            assert(partFrom in BODY_PARTS)
            assert(partTo in BODY_PARTS)

            idFrom = BODY_PARTS[partFrom]
            idTo = BODY_PARTS[partTo]

            if points[idFrom] and points[idTo] and not throwHasDetected:
                cv2.line(frame, points[idFrom], points[idTo], (0, 255, 0), 3)
                cv2.ellipse(frame, points[idFrom], (3, 3),
                            0, 0, 360, (0, 0, 255), cv2.FILLED)
                cv2.ellipse(frame, points[idTo], (3, 3),
                            0, 0, 360, (0, 0, 255), cv2.FILLED)
                
            #Adding detected arm moution to the last 30 frames (wich been detected ):
            if (shoulderPoint and elbowPoint and wristPoint and hipPoint):
            
                elbowAngle = angleFrom3poiintsDeg(wristPoint,shoulderPoint,elbowPoint)
                shoulderAngle = angleFrom3poiintsDeg(elbowPoint,hipPoint,shoulderPoint)
                if (len(last_30_Frames)<30):
                    last_30_Frames.append({"WristPoint":wristPoint,"ShoulderPoint":shoulderPoint,"ElbowPoint":elbowPoint,"HipPoint":hipPoint,"elbowAngle":elbowAngle,"ShoulderAngle":shoulderAngle})
                    appendedFrameCounter += 1
                else:
                    last_30_Frames[appendedFrameCounter%30] = {"WristPoint":wristPoint,"ShoulderPoint":shoulderPoint,"ElbowPoint":elbowPoint,"HipPoint":hipPoint,"elbowAngle":elbowAngle,"ShoulderAngle":shoulderAngle}
                    appendedFrameCounter += 1
                # print(throwHasDetected ,"  ", center , "  ", radius)
            
            if(elbowPoint and center and center[0]!=0) :
                #if ball has been thrown :
                maxDist = 150 if args.throw_type == "upperarm" else 120
                if (distance(elbowPoint,center)>maxDist and not ballDrawn):
                    throwHasDetected = True
                    ballBeginThrowPosition["center"] = center
                    ballBeginThrowPosition["radius"] = radius 
                    mmInPixel = 40/radius  
                    frameAfterthow = True

    t, _ = net.getPerfProfile()
    freq = cv2.getTickFrequency() / 1000
    cv2.putText(frame, '%.2fms' % (t / freq), (10, 20),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0))

    outFile.write(frame)
    cv2.imshow('OpenPose using OpenCV', frame)

    key = cv2.waitKey(1)
    if key == ord('q'):
        break
    if key == ord('p'):
        cv2.waitKey(-1) #wait until any key is pressed
    #stop with the "z" key :
    # _key = cv2.waitKey(1)
    # if _key == ord('z'):
    #     break

#save last frame image:
# cv2.imwrite("./lastFrame.jpg",lastFrame)


outFile.release()
cap.release()

minPointXCm ,minPointYCm = findMaxBallHight()

print("minPointXCm ,minPointYCm = " , minPointXCm ,minPointYCm)
print(ballTrajectoryPoints)
# cv2.destroyAllWindows()

from pymongo import MongoClient

# Connect to the server with the hostName and portNumber.
connection = MongoClient("mongodb+srv://bocciatracker:$henkar2022@botr.xzrx1.mongodb.net/boccia-tracker-db?retryWrites=true&w=majority")

# Connect to the Database where the images will be stored.
database = connection['PYTHON_UPLOADS']

import gridfs

#Create an object of GridFs for the above database.
fs = gridfs.GridFS(database)

#define an image object with the location.
file = "lastFrame.jpg"
videoFile = "output2.mp4"
#Open the image in read-only format.
# with open(videoFile, 'r') as f:
#     contents = f.read()
fileOpen = open(videoFile, 'rb' )

contents = fileOpen.read()
#Now store/put the image via GridFs object.
fs.put(contents, filename=args.videoFileName,angle = 23 , contentType = 'video/mp4')





# fileData = fs.find_one({'filename' : "videoFile.mp4"})
# output= open("videoFile1.mp4","wb")

# fileDatas = fileData.read()
# output.write(fileDatas)
# output.close()