
interface UserCategories {
  id: string;
  categoryName: "PATIENT" | "DOCTOR" | "TECHNICIAN" | "USER";
  status: boolean;
}

type LoginFormValues = z.infer<typeof LoginAuthSchema>

type AppointmentPayload = {
  tenantId: string;
  doctorId: string;
  appointmentDate: string;
  appointStartTime: string;
  patientName: string;
  appointmentFor: string;
  phoneNumber: string;

};



interface UserCategoriesResponse {
  status: number;
  message: string;
  data: UserCategories[];
}

interface Doctor {
    id: number;
    userId: number;
    firstName: string;
    lastName: string;
    maxAppointmentsPerTimeSlot: number;
    specialty: string;
    qualification: string;
    experienceYears: number;
    contactNumber: string;
    email: string;
    languages: string;
    availableTimeInterval: number;
    chargesPerTimeInterval: number;
    oauthId: string;
    profileStatus: boolean;
    address: string;
    baseImgUrl: string;
    iconImgUrl: string;
    departments: {
      id: number;
      departmentName: string;
    }[];
  }
  
  interface DoctorsResponse {
    status: number;
    message: string;
    data: Doctor[];
  }

  
  interface Treatment {
    id: number;
    departmentId: number;
    treatmentName: string;
    treatmentDescription: string;
  }
  
  interface Department {
    id: number;
    departmentName: string;
    description: string;
    serviceId: number;
    baseImgUrl: string;
    iconImgUrl: string;
    overview: string;
    treatments: Treatment[];
    createdBy: string;
    createdDate: string;
    lastModifiedBy: string;
    lastModifiedDate: string;
  }
  
  interface DepartmentsResponse {
    status: number;
    message: string;
    data: Department[];
  }
  
  interface TimeSlot {
    startTime: string;
    endTime: string;
    appointmentStatus: 'AVAILABLE' | 'NOTAVAILABLE';
    disabled: boolean;
    appointmentDate: string;
  }
  // Individual Doctor appointment slots for individual date
  interface AppointmentTimeSlot {
    startTime: string;
    endTime: string;
    appointmentStatus: 'AVAILABLE' | 'NOTAVAILABLE';
  }
  interface AppointmentSlots {
    appointmentDate: string;
    doctorId: number;
    appointmentTimeSlots: AppointmentTimeSlot[];
  }
  interface AppointmentSlotsResponse {
    status: number;
    message: string;
    data: AppointmentSlots[];
  }
  

  // {
  //   "status": 201,
  //   "message": "Appointment created successfully. Email sent to patient: null and doctor: saimahesh2382@gmail.com. SMS sent to patient: null and doctor: 9887654321.",
  //   "data": [
  //     {
  //       "createdBy": "anonymousUser",
  //       "createdDate": "2024-11-19T06:40:52.224+00:00",
  //       "lastModifiedBy": "anonymousUser",
  //       "lastModifiedDate": "2024-11-19T06:40:52.224+00:00",
  //       "id": 2,
  //       "patientId": 3,
  //       "doctorId": 1,
  //       "departmentId": null,
  //       "appointmentDate": "2024-11-19",
  //       "appointStartTime": "14:15:00",
  //       "appointEndTime": "14:30:00",
  //       "appointIntervalTime": 15,
  //       "appointmentCharge": 200,
  //       "status": "PENDING",
  //       "consultationType": "ONLINE",
  //       "notes": null,
  //       "patientName": "Divya",
  //       "appointmentFor": "SELF"
  //     }
  //   ]
  // }

  interface AppointmentSuccessResponse {
    status: number;
    message: string;
    data: SuccessAppointment[] | null;
  }

  interface SuccessAppointment {
    createdBy: string;
    createdDate: string;
    lastModifiedBy: string;
    lastModifiedDate: string;
    id: number;
    patientId: number;
    doctorId: number;
    departmentId: number;
    appointmentDate: string;
    appointStartTime: string;
    appointEndTime: string;
    appointIntervalTime: number;
    appointmentCharge: number;
    status: string;
    consultationType: string;
    notes: string;
    patientName: string;
    appointmentFor: string;
  }