export  class StringUtil{
   stripHtmlTags=(html:string) =>{
    const text = html.replace(/<[^>]*>?/gm, '');
    return text.trim(); // 去除字符串开头和结尾的空格
  }

}
export  default  new StringUtil();
