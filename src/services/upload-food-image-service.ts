import { supabase } from '../supabase.config';
import { lookup } from 'mime-types';

export class UploadFoodImageService {
    public async exec(file: Buffer, fileName: string): Promise<string> {
        try {
            
            const mimeType = lookup(fileName) || 'application/octet-stream';

            // Upload do arquivo
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('foodIMG/img') 
                .upload(fileName, file, {
                    contentType: mimeType, 
                    upsert: true, 
                });

            if (uploadError) {
                throw new Error(`Erro ao enviar imagem: ${uploadError.message}`);
            }

            const { data: publicData } = supabase.storage
                .from('foodIMG/img')
                .getPublicUrl(fileName);

            if (!publicData || !publicData.publicUrl) {
                throw new Error('Erro ao gerar URL pública.');
            }

            return publicData.publicUrl; 
        } catch (error: any) {
            console.error('Detalhes do erro:', error.message || error);
            throw new Error(error.message || 'Erro ao fazer upload da imagem.');
        }
    }
}
