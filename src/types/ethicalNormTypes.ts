export interface EthicalNormResponseDto {
    _id: string;
    evaluationId: string;
    description: string;
    status: string;
    codeNumber: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }


  export interface UpdateEthicalRuleParams {
    description?: string;
    status?: string;    
    codeNumber?: number;
  }

  export interface UpdateEthicalRuleResponseDto {
    _id: string;
    evaluationId: string;
    description: string;
    status: string;
    codeNumber: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
