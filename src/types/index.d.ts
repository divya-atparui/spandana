// ============================================================================
// Core Entity Types
// ============================================================================

// TODO: Consider creating a BaseEntity interface with common fields like id, createdBy, etc.

/** 
 * Hospital entity definition
 * @suggestion Consider splitting configuration fields into a separate config interface
 */
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

/** 
 * Doctor entity definition
 * @suggestion Add validation rules as comments for fields like email, phoneNumber
 */
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
  
  /** 
   * Department and Treatment definitions
   * @suggestion Consider making treatments optional if not always loaded
   */
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
 
  /** 
   * User category definition
   * @suggestion Consider using enum for categoryName
   */
  declare interface UserCategories {
    id: string;
    categoryName: "PATIENT" | "DOCTOR" | "TECHNICIAN" | "USER";
    status: boolean;
  }

  /** 
   * SuperAdmin Authentication Types
   */
  declare interface SuperAdminLoginVariables {
    username: string;
    password: string;
  }

  declare interface SuperAdminToken {
    token: string;
    expiresIn: number;
  }

  declare interface SuperAdminLoginResponse {
    status: number;
    message: string;
    data: SuperAdminToken[];
  }

// ============================================================================
// API Response Types
// ============================================================================

/** 
 * Generic response wrapper types
 * @suggestion Consider creating a generic ApiResponse<T> type
 */
declare interface HospitalsResponse {
  status: number;
  message: string;
  data: Hospitals[];
}

declare interface HospitalResponse {
  status: number;
  message: string;
  data: Hospitals[];
}

interface DoctorsResponse {
  status: number;
  message: string;
  data: Doctor[];
}

interface DepartmentsResponse {
  status: number;
  message: string;
  data: Department[];
}

interface UserCategoriesResponse {
  status: number;
  message: string;
  data: UserCategories[];
}

// ============================================================================
// Form and Input Types
// ============================================================================




/** 
 * Hospital creation/update form variables
 * @suggestion Consider making some fields optional for updates
 */
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

declare type LoginFormValues = z.infer<typeof LoginAuthSchema>

// ============================================================================
// Appointment Related Types
// ============================================================================

/** 
 * Appointment creation payload
 * @suggestion Add validation rules for date and time formats
 */
declare interface AppointmentPayload  {
  tenantId: string;
  doctorId: string;
  appointmentDate: string;
  appointStartTime: string;
  patientName: string;
  appointmentFor: string;
  phoneNumber: string;
};

/** 
 * Time slot related interfaces
 * @suggestion Consider using Date objects instead of strings for better type safety
 */
declare interface TimeSlot {
  startTime: string;
  endTime: string;
  appointmentStatus: 'AVAILABLE' | 'NOTAVAILABLE';
  disabled: boolean;
  appointmentDate: string;
}

declare interface AppointmentTimeSlot {
  startTime: string;
  endTime: string;
  appointmentStatus: 'AVAILABLE' | 'NOTAVAILABLE';
}

declare interface AppointmentSlots {
  appointmentDate: string;
  doctorId: number;
  appointmentTimeSlots: AppointmentTimeSlot[];
}

declare interface AppointmentSlotsResponse {
  status: number;
  message: string;
  data: AppointmentSlots[];
}

declare interface AppointmentSuccessResponse {
  status: number;
  message: string;
  data: SuccessAppointment[] | null;
}

/** 
 * Successful appointment details
 * @suggestion Add validation rules for required fields
 */
declare interface SuccessAppointment {
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


// ============================================================================
// Suggested Improvements:
// 1. Create a BaseEntity interface for common fields (id, created*, modified*)
// 2. Use a generic ApiResponse type for consistent response handling
// 3. Create enums for status values and category names
// 4. Add validation rules in comments for important fields
// 5. Consider using more specific types for dates and times
// 6. Add optional fields where appropriate for partial updates
// ============================================================================