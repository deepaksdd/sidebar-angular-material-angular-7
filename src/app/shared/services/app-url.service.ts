import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class AppUrlService {
    public getApiUrl(): string {
        return environment.baseUrl;
    }
    public getDocUrl(): string {
        return environment.docUrl;
    }
    public getHubUrl(): string {
        return environment.hubUrl;
    }
}
