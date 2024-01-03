function extractUUIDFromBlobUrl(blobUrl: string): string | null {
  const regex = /blob:http:\/\/localhost:\d+\/([a-fA-F0-9-]+)/;
  const match = blobUrl.match(regex);
  return match ? match[1] : null;
}

export default extractUUIDFromBlobUrl;
