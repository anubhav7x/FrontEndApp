import { Role } from './role';

export interface Features {
    FeatureName: string;
    Description: string;
    IsEnabled: boolean;
    CreatedBy: Role;
    LastUpdatedBy: Role;
    CreatedDate: Date;
    LastUpdatedDate: Date;
}
