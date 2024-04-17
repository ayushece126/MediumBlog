/**
 * v0 by Vercel.
 * @see https://v0.dev/t/cLOwBsc5IDF
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SigninType } from "@repo/zodtypes/types";
import { useState } from "react";
import axios from "axios";
import AuthAlert from "@/reusableComponents/AuthAlert";
import { LuLoader } from "react-icons/lu";
export default function Signin() {
  const [signinData, setSigninData] = useState<SigninType>({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      setError(null);
      setLoader(true);
      const response = await axios.post(
        "https://backend.mayush9652.workers.dev/api/v1/user/signin",
        signinData
      );
      console.log(response);
      if (response.data.error) {
        setLoader(false);
        return setError(response.data.error);
      } else {
        const jwt = response.data;
        localStorage.setItem("token", jwt.jwt);
        navigate("/blogs");
        setLoader(false);
      }
    } catch (error: any) {
      setLoader(false);
      setError(error.message);
    }
  };
  return (
    <div className=" flex flex-col justify-center items-center h-screen">
      <Card className="max-w-md mx-auto hover:bg-gray-100 dark:hover:bg-gray-800 p-8">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
          <CardDescription>
            Enter your email below to sign in to your account
          </CardDescription>
          <CardDescription>
            New member?
            <Link className="underline" to="/signup">
              Sign up
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="m@example.com"
              required
              type="email"
              onChange={(e) => {
                setSigninData((prevData) => ({
                  ...prevData,
                  [e.target.id]: e.target.value,
                }));
              }}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link className="ml-auto inline-block text-sm underline" to="#">
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              required
              type="password"
              onChange={(e) => {
                setSigninData((prevData) => ({
                  ...prevData,
                  [e.target.id]: e.target.value,
                }));
              }}
            />
          </div>
          <Button className="w-full" type="submit" onClick={handleSubmit}>
           {loader?  <LuLoader /> : "Sign In"}
          </Button>
          {error && <AuthAlert type={error}/>}
        </CardContent>
      </Card>
    </div>
  );
}
