"use client"
import React, { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { usePostHospitals } from '@/api/hospitals/use-post-hospitals'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

const TIME_OPTIONS = [
  { value: '15', label: '15 minutes' },
  { value: '30', label: '30 minutes' },
  { value: '60', label: '1 hour' },
  { value: '120', label: '2 hours' },
  { value: '180', label: '3 hours' },
]

const hospitalSchema = z.object({
  hospitalName: z.string().min(1, 'Hospital name is required'),
  hospitalAddress: z.string().min(1, 'Hospital address is required'),
  contactNumber: z.string().min(1, 'Contact number is required'),
  domainUrl: z.string().url('Please enter a valid URL'),
  url: z.string().url('Please enter a valid URL'),
  configurablePreBookingMinMinsBefore: z.string().min(1, 'Min booking time is required'),
  configurablePreBookingMaxMinsBefore: z.string().min(1, 'Max booking time is required'),
  baseImage: z.instanceof(File),
  iconImage: z.instanceof(File)
})

type HospitalFormValues = z.infer<typeof hospitalSchema>

const CreateHospital = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutate: createHospital, isPending } = usePostHospitals()
  const form = useForm<HospitalFormValues>({
    resolver: zodResolver(hospitalSchema),
    defaultValues: {
      hospitalName: '',
      hospitalAddress: '',
      contactNumber: '',
      domainUrl: '',
      url: '',
      configurablePreBookingMinMinsBefore: '',
      configurablePreBookingMaxMinsBefore: ''
    }
  })

  const minBookingTime = form.watch('configurablePreBookingMinMinsBefore')
  const hospitalName = form.watch('hospitalName')

  const formatDomainUrl = (name: string) => {
    if (!name) return ''
    const sanitized = name.toLowerCase().replace(/[^a-z0-9]/g, '')
    return `https://${sanitized}.atparui.com`
  }

  const formatUrl = (name: string) => {
    if (!name) return ''
    const sanitized = name.toLowerCase().replace(/[^a-z0-9]/g, '')
    return `https://${sanitized}.com`
  }

  useEffect(() => {
    if (hospitalName) {
      const sanitized = hospitalName.toLowerCase().replace(/[^a-z0-9]/g, '')
      form.setValue('domainUrl', formatDomainUrl(sanitized))
      form.setValue('url', formatUrl(sanitized))
    }
  }, [hospitalName, form])

  const filteredMaxTimeOptions = TIME_OPTIONS.filter(
    option => parseInt(option.value) >= parseInt(minBookingTime || '0')
  )

  const onSubmit = async (data: HospitalFormValues) => {
    try {
      const formData = new FormData();
      
      // Add text fields
      formData.append('hospitalName', data.hospitalName);
      formData.append('hospitalAddress', data.hospitalAddress);
      formData.append('contactNumber', data.contactNumber);
      formData.append('domainUrl', data.domainUrl);
      formData.append('url', data.url);
      formData.append('tenantId', data.hospitalName.toLowerCase().replace(/[^a-z0-9]/g, ''));
      formData.append('configurablePreBookingMinMinsBefore', data.configurablePreBookingMinMinsBefore);
      formData.append('configurablePreBookingMaxMinsBefore', data.configurablePreBookingMaxMinsBefore);

      // Add files if they exist
      const baseImageField = form.getValues('baseImage');
      const iconImageField = form.getValues('iconImage');

      if (baseImageField instanceof File) {
        formData.append('baseImage', baseImageField);
      }
      if (iconImageField instanceof File) {
        formData.append('iconImage', iconImageField);
      }

      createHospital(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['hospitals'] })
          router.push('/admin')
        },
        onError: (error) => {
          console.error('Error creating hospital:', error)
        }
      })
    } catch (error) {
      console.error('Error preparing form data:', error)
    }
  }

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Create New Hospital</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="hospitalName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hospital Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="hospitalAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hospital Address</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="domainUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domain URL</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Input 
                        {...field}
                        disabled
                        placeholder="URL will be generated automatically"
                      />
                      {hospitalName && (
                        <div className="text-sm text-muted-foreground">
                          Preview: {formatDomainUrl(hospitalName)}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Input 
                        {...field}
                        disabled
                        placeholder="URL will be generated automatically"
                      />
                      {hospitalName && (
                        <div className="text-sm text-muted-foreground">
                          Preview: {formatUrl(hospitalName)}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="configurablePreBookingMinMinsBefore"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Booking Time</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select minimum booking time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TIME_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="configurablePreBookingMaxMinsBefore"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Booking Time</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    disabled={!minBookingTime}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select maximum booking time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filteredMaxTimeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="baseImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base Image</FormLabel>
                  <FormControl>
                    <Input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="iconImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon Image</FormLabel>
                  <FormControl>
                    <Input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end mt-6">
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Creating...' : 'Create Hospital'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CreateHospital