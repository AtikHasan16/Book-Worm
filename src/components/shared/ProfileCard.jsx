"use client";
import React from "react";
import { useSession } from "next-auth/react";
import {
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Chip,
  Button,
  Divider,
} from "@heroui/react";
import { Mail, Shield, User } from "lucide-react";
import LoadingClient from "./LoadingClient";

const ProfileCard = () => {
  const { data: session } = useSession();

  const { name, email, role, image } = session?.user || {};

  const handleEditProfile = () => {
    
  };

  return (
    <>
      {session?.user ? (
        <Card className="w-full max-w-2xl mx-auto shadow-lg border-none bg-white/70 backdrop-blur-md">
          <CardHeader className="flex gap-5 p-6">
            <Avatar
              isBordered
              color={role === "admin" ? "danger" : "primary"}
              src={image}
              className="w-24 h-24 text-large ring-2"
            />
            <div className="flex flex-col gap-2 flex-1 justify-center">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold font-fraunses text-bookNavy">
                  {name}
                </h1>
                <Chip
                  color={role === "admin" ? "danger" : "success"}
                  variant="flat"
                  size="sm"
                  className="uppercase font-bold"
                >
                  {role}
                </Chip>
              </div>
              <p className="text-bookNavy/60 font-medium font-dm-sans text-lg">
                @{name?.toLowerCase().replace(/\s+/g, "")}
              </p>
            </div>
            <Button
              onPress={() => handleEditProfile()}
              color="primary"
              variant="flat"
              className="font-bold"
            >
              Edit Profile
            </Button>
          </CardHeader>

          <Divider />

          <CardBody className="p-6 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-bookNavy/5 border border-bookNavy/10">
                <div className="p-3 rounded-full bg-white shadow-sm text-bookNavy">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider font-bold text-bookNavy/50">
                    Email Address
                  </p>
                  <p className="text-lg font-medium text-bookNavy">{email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-bookNavy/5 border border-bookNavy/10">
                <div className="p-3 rounded-full bg-white shadow-sm text-bookNavy">
                  <Shield size={24} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider font-bold text-bookNavy/50">
                    Account Role
                  </p>
                  <p className="text-lg font-medium text-bookNavy capitalize">
                    {role}
                  </p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      ) : (
        <LoadingClient />
      )}
    </>
  );
};

export default ProfileCard;
