'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
} from "@/components/ui/field"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'

const AuthForm = ({ type }: { type: string }) => {
    const [user, setUser] = useState(null);

    const form = useForm<z.infer<typeof authFormSchema>>({
        resolver: zodResolver(authFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    function onSubmit(data: z.infer<typeof authFormSchema>) {
        console.log(data)
    }

  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
            <Link
                href='/'
                className='cursor-pointer flex items-center gap-1.5'
            >
              <Image
                 src='/icons/logo.svg'
                 alt='Horizon logo'
                 width={34}
                 height={34}
              />
              <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
            </Link>

            <div className='flex flex-col gap-1 md:gap-3'>
                <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                    {user ? 'Link Account'
                       : type === 'sign-in'
                       ? 'sign-in'
                        : 'sign-up'
                    }
                    <p className='text-16 font-normal text-gray-600'>
                        {user ? 'Link your account to get started'
                              : 'Please enter your details'
                        }
                    </p>
                </h1>
            </div>
        </header>

        {user ? (
            <div className='flex flex-col gap-4'>
                {/* plaid link */}
            </div>
          ) : (
            <>
                <CardContent>
                    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <CustomInput 
                                control={form.control}  
                                name='email'
                                label='Email'
                                placeholder="Please enter your email"
                            />

                            <CustomInput 
                                control={form.control}  
                                name='password'
                                label='Password'
                                placeholder="Please enter your password"
                            />
                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter>
                    <Field orientation="horizontal">
                    <Button type="button" variant="outline" onClick={() => form.reset()}>
                        Reset
                    </Button>
                    <Button type="submit" form="form-rhf-demo">
                        Submit
                    </Button>
                    </Field>
                </CardFooter>
            </>
          )
        }
    </section>
  )
}

export default AuthForm
