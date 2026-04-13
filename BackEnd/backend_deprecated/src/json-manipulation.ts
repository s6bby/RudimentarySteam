import { writeFile, readFile } from 'fs/promises';

export async function saveToJsonFile(data: any, filePath: string = '../data/data.json'): Promise<void>
{
    try {
        await writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

export async function loadFromJsonFile(filePath: string = '../data/data.json'): Promise<any>
{
    try {
        const data = await readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading data:', error);
        return null;
    }
}