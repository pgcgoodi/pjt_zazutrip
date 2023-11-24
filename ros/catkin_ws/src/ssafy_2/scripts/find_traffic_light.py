#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import rospy
import sys
import os
from math import sqrt, pow
from morai_msgs.msg import EgoVehicleStatus, GetTrafficLightStatus, SetTrafficLight
from geometry_msgs.msg import Point32
import time

current_path = os.path.dirname(os.path.realpath(__file__))
sys.path.append(current_path)

from lib.mgeo.class_defs import *

class listener():
    def __init__ (self):
        rospy.init_node('Traffic_status_listener', anonymous=True)

        rospy.Subscriber('/Ego_topic', EgoVehicleStatus, self.Egostatus_callback)
        rospy.Subscriber('/GetTrafficLightStatus', GetTrafficLightStatus, self.traffic_light_callback)
        self.set_traffic_pub = rospy.Publisher('/SetTrafficLight', SetTrafficLight, queue_size=100)

        load_path = os.path.normpath(os.path.join(current_path, 'lib/mgeo_data/R_KR_PG_K-City'))
        mgeo_planner_map = MGeo.create_instance_from_json(load_path)
        
        self.set_traffic_msg = SetTrafficLight()
        self.is_traffic = False
        light_set = mgeo_planner_map.light_set
        self.lights = light_set.signals

        rate = rospy.Rate(10)
        while not rospy.is_shutdown():
            if self.is_traffic:
                self.light_msg = self.findTrafficLight()

                dis = sqrt(pow(self.ego_x - self.light_msg.x, 2) + pow(self.ego_y - self.light_msg.y, 2))

                if dis < 40 and self.trafficLightStatus == 1 and self.velocity < 1:
                    for i in range(100000000):
                        tmp = i
                    self.set_traffic_msg.trafficLightIndex = self.trafficLightIdx

                    if self.trafficLightType == 2:
                        self.set_traffic_msg.trafficLightStatus = 48
                        self.set_traffic_pub.publish(self.set_traffic_msg)
                        if self.trafficLightIdx == "C119BS010028":
                            time.sleep(0.05)
                            self.set_traffic_msg.trafficLightIndex = "C119BS010029"
                            self.set_traffic_pub.publish(self.set_traffic_msg)
                            time.sleep(0.05)
                            self.set_traffic_msg.trafficLightIndex = "C119BS010031"
                            self.set_traffic_pub.publish(self.set_traffic_msg)
                            time.sleep(0.05)
                            self.set_traffic_msg.trafficLightIndex = "C119BS010032"
                            self.set_traffic_pub.publish(self.set_traffic_msg)
                        elif self.trafficLightIdx == "C119BS010055":
                            time.sleep(0.05)
                            self.set_traffic_msg.trafficLightIndex = "C119BS010056"
                            self.set_traffic_pub.publish(self.set_traffic_msg)
                            time.sleep(0.05)
                            self.set_traffic_msg.trafficLightIndex = "C119BS010059"
                            self.set_traffic_pub.publish(self.set_traffic_msg)
                            time.sleep(0.05)
                            self.set_traffic_msg.trafficLightIndex = "C119BS010060"
                            self.set_traffic_pub.publish(self.set_traffic_msg)
                        elif self.trafficLightIdx == "C119BS010035":
                            time.sleep(0.05)
                            self.set_traffic_msg.trafficLightIndex = "C119BS010036"
                            self.set_traffic_pub.publish(self.set_traffic_msg)
                            time.sleep(0.05)
                            self.set_traffic_msg.trafficLightIndex = "C119BS010037"
                            self.set_traffic_pub.publish(self.set_traffic_msg)
                            time.sleep(0.05)
                            self.set_traffic_msg.trafficLightIndex = "C119BS010038"
                            self.set_traffic_pub.publish(self.set_traffic_msg)
                        elif self.trafficLightIdx == "C119BS010051":
                            time.sleep(0.05)
                            self.set_traffic_msg.trafficLightIndex = "C119BS010052"
                            self.set_traffic_pub.publish(self.set_traffic_msg)
                            time.sleep(0.05)
                            self.set_traffic_msg.trafficLightIndex = "C119BS010079"
                            self.set_traffic_pub.publish(self.set_traffic_msg)
                            time.sleep(0.05)
                            self.set_traffic_msg.trafficLightIndex = "C119BS010080"
                            self.set_traffic_pub.publish(self.set_traffic_msg)
                        elif self.trafficLightIdx == "C119BS010076":
                            time.sleep(0.05)
                            self.set_traffic_msg.trafficLightIndex = "C119BS010077"
                            self.set_traffic_pub.publish(self.set_traffic_msg)

                    elif self.trafficLightType == 0:
                        self.set_traffic_msg.trafficLightStatus = 16
                        self.set_traffic_pub.publish(self.set_traffic_msg)
                        if self.trafficLightIdx == "C119BS010063":
                            time.sleep(0.3)
                            self.set_traffic_msg.trafficLightIndex = "C119BS010064"
                            self.set_traffic_pub.publish(self.set_traffic_msg)
                        elif self.trafficLightIdx == "C119BS010069":
                            time.sleep(0.3)
                            self.set_traffic_msg.trafficLightIndex = "C119BS010075"
                            self.set_traffic_pub.publish(self.set_traffic_msg)

            rate.sleep()
    
    def Egostatus_callback(self,msg):
        self.ego_x = msg.position.x
        self.ego_y = msg.position.y
        self.velocity = msg.velocity.x

    def traffic_light_callback(self,msg):
        self.is_traffic = True
        self.trafficLightIdx = msg.trafficLightIndex
        self.trafficLightType = msg.trafficLightType
        self.trafficLightStatus = msg.trafficLightStatus

    def findTrafficLight(self):
        near_light = Point32()
        for light_idx in self.lights:
            tmp_Idx = self.lights[light_idx].idx
            if tmp_Idx == self.trafficLightIdx:
                near_light.x = self.lights[light_idx].point[0]
                near_light.y = self.lights[light_idx].point[1]

                return near_light
    

if __name__ == '__main__':
    test=listener()