/**
 * v0 by Vercel.
 * @see https://v0.dev/t/4ZS8h9QgSM6
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Link, useNavigate } from "react-router-dom";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SignupType } from "@repo/zodtypes/types";
import axios from "axios";
import AuthAlert from "@/reusableComponents/AuthAlert";
import { LuLoader } from "react-icons/lu";

export default function Signup() {
  const [postInput, setPostInput] = useState<SignupType>(() => {
    return {
      name: "",
      password: "",
      email: "",
    };
  });
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      setError(null);
      setLoader(true);
      const response = await axios.post(
        "https://backend.mayush9652.workers.dev/api/v1/user/signup",
        postInput
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
    <div className="w-full py-12 space-y-12 md:py-24 lg:grid-cols-2 lg:space-y-0 lg:py-32 xl:gap-20 xl:py-48">
      <div className="container flex flex-col items-center justify-center px-4 space-y-4 text-center md:px-6 lg:order-1 lg:flex-row lg:items-start lg:text-left xl:space-y-6 xl:max-w-3xl xl:mx-auto">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl/none">
            Create an account
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Already have an account?
            <Link className="underline" to="/signin">
              Sign in
            </Link>
          </p>
        </div>
        <div className="w-full max-w-[400px] space-y-4 xl:max-w-[450px]">
          <Card className="hover:bg-gray-500 dark:hover:bg-gray-800">
            <Card className="hover:bg-gray-100 dark:hover:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl">Create an account</CardTitle>
                <CardDescription>
                  Enter your information to create an account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    required
                    onChange={(e) => {
                      setPostInput((prevState) => ({
                        ...prevState,
                        [e.target.id]: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    required
                    type="email"
                    onChange={(e) => {
                      setPostInput((prevState) => ({
                        ...prevState,
                        [e.target.id]: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    required
                    type="password"
                    onChange={(e) => {
                      setPostInput((prevState) => ({
                        ...prevState,
                        [e.target.id]: e.target.value,
                      }));
                    }}
                  />
                </div>
                <Button className="w-full" onClick={handleSubmit}>
                  {loader ? <LuLoader /> : "Sign Up"}
                </Button>
                {error && <AuthAlert type={error} />}
              </CardContent>
            </Card>
          </Card>
        </div>
      </div>
      <div className="flex items-center justify-center px-4 md:px-6 lg:order-0">
        <div className="grid max-w-sm gap-3 lg:max-w-[500px]">
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Introduce your team to the world. Highlight your company's mission
            and vision. You can also list some key features or benefits here.
          </p>
        </div>
      </div>
    </div>
  );
}
