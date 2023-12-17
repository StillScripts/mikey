// Function to fetch data from a URL using fetch
const fetchMetadataFromUrl = async (url: string) => {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch data from URL: ${url}`)
    }

    const html = await response.text()

    // Use a library like cheerio or implement a custom parser based on your needs
    // For simplicity, this example uses a regular expression to find the title tag content
    const match = html.match(/<title[^>]*>([^<]+)<\/title>/i)

    const title = match ? match[1].trim() : null
    // Extract the necessary data from the response
    const meta = {
      title
    }
    console.log(meta)

    return meta
  } catch (error) {
    console.error('Error fetching data from URL:', error)
    throw error
  }
}

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  const meta = await fetchMetadataFromUrl(url!)
  return Response.json({
    success: 1,
    link: url,
    meta
  })
}
