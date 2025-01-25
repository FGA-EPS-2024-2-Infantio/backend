export class CreateTicketDTO {
    id: string;
    title: string;
    message: string;
    response?: string; 
    status: 'OPEN' | 'CLOSED'; 
    directorId: string;
    directorName: string;
    adminId?: string; 
  }