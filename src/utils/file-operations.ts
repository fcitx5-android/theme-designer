export function saveBlobAs(blob: Blob, filename: string) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.onclick = () => {
        a.onclick = null;
        Promise.resolve().then(() => URL.revokeObjectURL(a.href));
    };
    a.click();
}

export function readFileAs<T>(file: File, read: (reader: FileReader, file: File) => void): Promise<T> {
    const reader = new FileReader();
    return new Promise((resolve) => {
        reader.onload = e => {
            resolve(e.target!.result as T);
        };
        read(reader, file);
    });
}

export function readFileAsString(file: File): Promise<string> {
    return readFileAs<string>(file, (reader, f) => reader.readAsText(f));
}

export function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
    return readFileAs<ArrayBuffer>(file, (reader, f) => reader.readAsArrayBuffer(f));
}
