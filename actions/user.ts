"use server";
import * as z from "zod";
import { getSensorById, updateSensor, deleteSensorById, getAllSensorByUserId } from "@/data/sensor";
import { db } from "@/lib/db";
import { ContactsSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";