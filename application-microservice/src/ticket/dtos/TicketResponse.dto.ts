export class TicketResponseDto {
    id: string;
    title: string;
    message: string; 
    response?: string; 
    status: 'OPEN' | 'CLOSED';
    directorId: string; 
    directorName: string; 
    adminId?: string; 
    
    createdAt: Date; 
    updatedAt: Date; 
  }
  