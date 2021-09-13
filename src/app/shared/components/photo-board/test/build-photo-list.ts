import { Photo } from '../interfaces/photo';

/**
* Aux function
* @returns 
*/
export function buildPhotoList(): Photo[] {
    const photos: Photo[] = [];
    for(let i=0; i<8; i++) {
    photos.push({
        id: i+1,
        url: '',
        description: ''
    });
    }
    return photos;
}