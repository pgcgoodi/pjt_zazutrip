#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import rospy
from morai_msgs.msg import EgoVehicleStatus
from std_msgs.msg import Float64

class listener():
    def __init__(self):
        rospy.init_node('Calc_kids_vel', anonymous=True)
        rospy.Subscriber('/Ego_topic', EgoVehicleStatus, self.Egostatus_callback)

        self.kids_vel_pub = rospy.Publisher('/KidsVel', Float64, queue_size=1)
        self.is_status = False

        rate = rospy.Rate(10)
        while not rospy.is_shutdown():
            if self.is_status:
                self.target_vel = 50
                if (75<=self.ego_x<=130 and 1140<=self.ego_y<=1205):
                    self.target_vel = 20
                    while(1):
                        self.kids_vel_pub.publish(self.target_vel)
                        if not (75<=self.ego_x<=130 and 1140<=self.ego_y<=1205):
                            break
                else:
                    self.kids_vel_pub.publish(self.target_vel)
            rate.sleep()

    def Egostatus_callback(self,msg):
        self.is_status = True
        self.ego_x = msg.position.x
        self.ego_y = msg.position.y
        self.velocity = msg.velocity.x

if __name__ == '__main__':
    test = listener()