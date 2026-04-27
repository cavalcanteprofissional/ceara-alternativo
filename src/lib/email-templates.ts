export function commentNotificationEmail(data: {
  authorName: string
  authorEmail: string
  content: string
  postTitle: string
  postSlug: string
  siteUrl: string
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  
  <div style="background: #dc2626; padding: 20px; border-radius: 8px 8px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">Novo Comentário</h1>
  </div>
  
  <div style="background: #fff; border: 1px solid #e5e5e5; border-top: none; padding: 20px; border-radius: 0 0 8px 8px;">
    
    <div style="background: #f5f5f5; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
      <p style="margin: 0;"><strong>Post:</strong> ${data.postTitle}</p>
    </div>
    
    <h2 style="font-size: 18px; margin-bottom: 10px;">Detalhes do Comentário</h2>
    
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr>
        <td style="padding: 8px 0; color: #666;">Autor:</td>
        <td style="padding: 8px 0; font-weight: bold;">${data.authorName}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #666;">Email:</td>
        <td style="padding: 8px 0;">${data.authorEmail}</td>
      </tr>
    </table>
    
    <div style="background: #fef3f3; border-left: 4px solid #dc2626; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
      <p style="margin: 0; font-style: italic;">"${data.content}"</p>
    </div>
    
    <div style="text-align: center; margin-top: 20px;">
      <a href="${data.siteUrl}/admin/comments" style="background: #dc2626; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; font-weight: bold;">
        Moderação de Comentários
      </a>
    </div>
    
    <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;">
    
    <p style="color: #666; font-size: 12px; text-align: center; margin: 0;">
      Ceará Alternativo - Portal de Notícias do Ceará
    </p>
  </div>
  
</body>
</html>
  `.trim()
}