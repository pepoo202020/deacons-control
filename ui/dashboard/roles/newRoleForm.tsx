'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { NEW_ROLE_DIALOG_CONTENT } from '@/constants/roles.data'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast  from 'react-hot-toast'
import { z } from 'zod'

const newRoleFormSchema = z.object({
    roleName: z.string().min(1),
    roleDescription: z.string().min(1),
})

export default function NewRoleForm({lang = 'AR', onDialogChange}:{lang?: 'AR' | 'EN'; onDialogChange: (open: boolean) => void}) {
    const form = useForm<z.infer<typeof newRoleFormSchema>>({
        resolver: zodResolver(newRoleFormSchema),
        defaultValues: {
            roleName: '',
            roleDescription: '',
        },
    })
    function onSubmit(data: z.infer<typeof newRoleFormSchema>) {
        console.log(data)
        toast.success('Role created successfully')
        
    }

    function onCancel() {
        form.reset() // reset the form to its initial state
        form.clearErrors() // clear any validation errors
        onDialogChange(false)
    }
  return (
    <div className='h-full'>
        <Form {...form}>
        <form className='w-full space-y-2' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
                control={form.control}
                name="roleName"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>{NEW_ROLE_DIALOG_CONTENT.formFields.name[lang]}</FormLabel>
                        <FormControl>
                            <Input type='text' placeholder={NEW_ROLE_DIALOG_CONTENT.formFieldsPlaceholders.name[lang]} {...field} className='global-input' />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="roleDescription"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>{NEW_ROLE_DIALOG_CONTENT.formFields.description[lang]}</FormLabel>
                        <FormControl>
                            <Input  type='text' placeholder={NEW_ROLE_DIALOG_CONTENT.formFieldsPlaceholders.description[lang]} {...field} className='global-input' />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className='w-full flex flex-col md:flex-row items-center md:justify-end gap-2 mt-5'>
            <Button  className='global-submit-btn' type='submit'>{NEW_ROLE_DIALOG_CONTENT.submitButton[lang]}</Button>
            <Button onClick={onCancel} className='global-cancel-btn'  type='button'>{NEW_ROLE_DIALOG_CONTENT.cancelButton[lang]}</Button>
            </div>
        </form>
    </Form>
    </div>
  )
}
