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
  FieldGroup,
} from "@/components/ui/field"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/actions/user.actions'
import PlaidLink from './PlaidLink'

const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoding] = useState(false);

    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            address1: "",
            state: "",
            city: "",
            postalCode: "",
            dateOfBirth: "",
            ssn: "",
            email: "",
            password: "",
        },
    })
    const onSubmit = async(data: z.infer<typeof formSchema>) => {
        setIsLoding(true);
        
        try {
            // sign up with Appwrite & create plaid token

            if(type === 'sign-up') {
                const newUser = await signUp(data);

                setUser(newUser);
            }

            if(type === 'sign-in') {
                const response = await signIn({
                    email: data.email,
                    password: data.password
                });

                if(response) {
                    router.push('/');
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoding(false);
        }
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
                       ? 'Sign In'
                        : 'Sign Up'
                    }
                    <p className='text-16 font-normal text-gray-600 my-1.5'>
                        {user ? 'Link your account to get started'
                              : 'Please enter your details'
                        }
                    </p>
                </h1>
            </div>
        </header>

        {/* {user ? ( */}
            <div className='flex flex-col gap-4'>
                <PlaidLink user={user} variant="primary" />
            </div>
          {/* ) : ( */}
            <>
                <CardContent>
                    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            {type === 'sign-up' && (
                                <>
                                    <div className='flex gap-4'>
                                        <CustomInput 
                                            control={form.control}  
                                            name='firstName'
                                            label='First Name'
                                            placeholder="Enter your first name"
                                        />

                                        <CustomInput 
                                            control={form.control}  
                                            name='lastName'
                                            label='Last Name'
                                            placeholder="Enter your last name"
                                        />
                                    </div>

                                    <CustomInput 
                                        control={form.control}  
                                        name='address1'
                                        label='Address'
                                        placeholder="Enter your specific address"
                                    />

                                    <CustomInput 
                                        control={form.control}  
                                        name='state'
                                        label='State'
                                        placeholder="Enter your state"
                                    />

                                    <div className='flex gap-4'>
                                        <CustomInput 
                                            control={form.control}  
                                            name='city'
                                            label='City'
                                            placeholder="Enter your city"
                                        />

                                        <CustomInput 
                                            control={form.control}  
                                            name='postalCode'
                                            label='Postal code'
                                            placeholder="ex : 750550"
                                        />
                                    </div>

                                    <div className='flex gap-4'>
                                        <CustomInput 
                                            control={form.control}  
                                            name='dateOfBirth'
                                            label='Date of Birth'
                                            placeholder="YYYY-MM-DD"
                                        />

                                        <CustomInput 
                                            control={form.control}  
                                            name='ssn'
                                            label='SSN'
                                            placeholder="ex : 1234"
                                        />
                                    </div>
                                </>
                            )}
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
                <CardFooter className='border-none'>
                    <div className='flex w-full flex-col gap-4'>
                        <Button 
                            type="submit" 
                            form="form-rhf-demo" 
                            className="form-btn h-10 flex-center"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 
                                        size={20}
                                        className='animate-spin'
                                    /> &nbsp; 
                                    Loading...
                                </>
                            ) : (
                                type === 'sign-in' ? 'Sign In' : 'Sign Up'
                            )}
                        </Button>
                    </div>
                </CardFooter>

                <footer className='flex justify-center gap-1.5'>
                    <p className='text-14 font-normal text-gray-600'>
                        {
                            type === 'sign-in' ? 
                                    "Don't have an account?"
                                  : "Already have an account?"
                        }
                    </p>
                    <Link
                        href={type === 'sign-in' ? "/sign-up" : "/sign-in"}
                        className='form-link'
                    >
                        {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
                    </Link>
                </footer>
            </>
          {/* ) */}
        {/* } */}
    </section>
  )
}

export default AuthForm
