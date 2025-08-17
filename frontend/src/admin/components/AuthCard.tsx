import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AuthCard = ({ password, setPassword, handleLogin }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
      <Card className="w-full max-w-md rounded-lg shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">
            Admin Access
          </CardTitle>
          <CardDescription className="text-md text-muted-foreground mt-2">
            Enter password to access admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-lg font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                className="h-12 text-lg rounded-md border-gray-300 focus:border-primary focus:ring-primary"
              />
            </div>
            <Button
              onClick={handleLogin}
              className="w-full h-12 text-lg rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
              variant="adventure"
            >
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCard;
