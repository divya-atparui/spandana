// {
//   "status": 0,
//   "message": "string",
//   "data": [
//     {
//       "id": 0,
//       "domainUrl": "string",
//       "baseImgUrl": "string",
//       "iconImgUrl": "string",
//       "configurablePreBookingMinMinsBefore": 0,
//       "configurablePreBookingMaxMinsBefore": 0,
//       "hospitalName": "string",
//       "hospitalAddress": "string",
//       "contactNumber": "string",
//       "tenantId": "string",
//       "url": "string"
//     }
//   ]
// }
declare interface Hospitals {
  id: number;
  domainUrl: string;
  baseImgUrl: string;
  iconImgUrl: string;
  configurablePreBookingMinMinsBefore: number;
  configurablePreBookingMaxMinsBefore: number;
  hospitalName: string;
  hospitalAddress: string;
  contactNumber: string;
  tenantId: string;
  url: string;
}

declare interface HospitalsResponse {
  status: number;
  message: string;
  data: Hospitals[];
}

declare interface HospitalVariables {
  hospitalName: string;
  hospitalAddress: string;
  contactNumber: string;
  domainUrl: string;
  url: string;
  tenantId: string;
  configurablePreBookingMinMinsBefore: string;
  configurablePreBookingMaxMinsBefore: string;
  baseImage: File;
  iconImage: File;
}

declare interface HospitalResponse {
  status: number;
  message: string;
  data: Hospitals[];
}

declare interface UserCategories {
  id: string;
  categoryName: "PATIENT" | "DOCTOR" | "TECHNICIAN" | "USER";
  status: boolean;
}

declare type LoginFormValues = z.infer<typeof LoginAuthSchema>

declare type AppointmentPayload = {
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