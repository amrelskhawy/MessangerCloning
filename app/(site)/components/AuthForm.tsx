"use client"

import AuthSocialButton from "@/app/components/AuthSocialButton"
import Button from "@/app/components/Button"
import Input from "@/app/components/Inputs/Input"
import {useCallback, useEffect, useState} from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { BsGithub, BsGoogle } from "react-icons/bs"
import axios from "axios";
import {toast} from "react-hot-toast"
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";


type Variant = "LOGIN" | "REGISTER"

const AuthForm = () => {

  const session = useSession()
  const router = useRouter()
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (session.status === 'authenticated') {
      toast.success("Logged In!")
      router.push('/users')
    }
  },[session?.status])

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") setVariant("REGISTER")
    else setVariant("LOGIN")
  }, [variant])

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  })


  // On Submit function
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    if (variant === 'REGISTER') {
      axios
          .post("/api/register", data)
          .then(()=> {
            toast.success('Registered Successfully')
            signIn('credentials',data)
          })
          .catch(()=> toast.error('Something Went Wrong') )
          .finally(()=> setIsLoading(false))
    } else {
      signIn('credentials',
          {
            ...data,
            redirect: false
          })
          .then((callback) => {
            if (callback?.error) {
              toast.error("Invalid Credentials")
            }
            if (callback?.ok && !callback?.error) {
              toast.success("Logged In!")
            }
          })
          .finally(()=> setIsLoading(false))
    }
  }

  const socialAction = (action: string) => {
    setIsLoading(true)


   signIn(action, {redirect: false})
       .then((callback) => {
         if (callback?.error) {
           toast.error("Invalid Credentials")
         }
         if (callback?.ok && !callback?.error) {
           toast.success("Logged In!")
         }
       })
       .finally(()=> setIsLoading(false))


  }

  return (
    <div className="
    mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {variant === 'REGISTER' && (

            <Input
              label="Name"
              id="name"
              register={register}
              errors={errors}
              disabled={isLoading}

            />
          )}
          <Input
            label="Email address"
            id="email"
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}

          />
          <Input
            label="Password"
            id="password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}

          />
          <div>
            <Button
              disabled={isLoading}
              fullWidth={true}
              type="submit"
            >
              {variant === "LOGIN" ? "Login" : "Register"}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
            >

              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or Continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction('github')}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction('google')}
            />
          </div>
        </div>
        <div onClick={toggleVariant}
          className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">

          <div
          >
            {variant === "LOGIN" ? "New to Messenger ?" : "Already have an account ?"}
          </div>
          <div className="underline cursor-pointer">
            {variant === "LOGIN" ? "Create an Account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm