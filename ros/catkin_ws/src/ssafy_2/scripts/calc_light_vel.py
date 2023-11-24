#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import rospy
import sys
import os
from math import sqrt, pow
from morai_msgs.msg import EgoVehicleStatus, GetTrafficLightStatus
from geometry_msgs.msg import Point32
from std_msgs.msg import Float64

current_path = os.path.dirname(os.path.realpath(__file__))
sys.path.append(current_path)

from lib.mgeo.class_defs import *

class listener():
    def __init__(self):
        rospy.init_node('Calc_traffic_vel', anonymous=True)
        rospy.Subscriber('/Ego_topic', EgoVehicleStatus, self.Egostatus_callback)
        rospy.Subscriber('/GetTrafficLightStatus', GetTrafficLightStatus, self.traffic_light_callback)
        self.light_vel_pub = rospy.Publisher('/LightVel', Float64, queue_size=1)

        load_path = os.path.normpath(os.path.join(current_path, 'lib/mgeo_data/R_KR_PG_K-City'))
        mgeo_planner_map = MGeo.create_instance_from_json(load_path)

        self.is_status = False
        self.is_traffic = False
        light_set = mgeo_planner_map.light_set
        self.lights = light_set.signals

        rate = rospy.Rate(10)
        while not rospy.is_shutdown():
            if self.is_status:
                self.target_vel = 50
                if self.is_traffic:
                    self.light_msg = self.findTrafficLight()
                    dis = sqrt(pow(self.ego_x - self.light_msg.x, 2) + pow(self.ego_y - self.light_msg.y, 2))
                    print(self.velocity * 3.6 / 2)
                    if dis < self.velocity * 3.6 / 2 + 2 and dis > 7:
                        if self.trafficLightStatus == 1 or self.trafficLightStatus == 4 or self.trafficLightStatus == 33:
                            self.target_vel = 0
                            while(1):
                                self.light_vel_pub.publish(self.target_vel)
                                if self.trafficLightStatus == 16 or self.trafficLightStatus == 48:
                                    break
                    
                    else:
                        self.light_vel_pub.publish(self.target_vel)

                else:
                    self.light_vel_pub.publish(self.target_vel)

            rate.sleep()

        
    def Egostatus_callback(self,msg):
        self.is_status = True
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
    test = listener()