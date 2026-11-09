import React from 'react'
import { Control, Controller, FieldPath, useForm } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from './ui/field'
import { Input } from './ui/input'
import z from 'zod'
import { authFormSchema } from '@/lib/utils'

const formSchema = authFormSchema('sign-up');

interface CustomInputProps {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    label: string,
    placeholder: string,
}

const CustomInput = ({ control, name, label, placeholder }: CustomInputProps) => {
  return (
    <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
            <div className='form-item'>
                <FieldLabel htmlFor="form-rhf-demo-password" className='form-label border-none'>
                    {label}
                </FieldLabel>
                <div className='flex flex-col w-full'>
                    <Input
                        {...field}
                        id={`form-rhf-demo-${name}`}
                        aria-invalid={fieldState.invalid}
                        placeholder={placeholder}
                        className='input-class focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-input'
                        autoComplete="off"
                        type={name === 'password' ? 'password' : 'text'}
                    />
                </div>
            </div>
            {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} className='text-red-600 font-semibold' />
            )}
        </Field>
        )}
    />
  )
}

export default CustomInput
