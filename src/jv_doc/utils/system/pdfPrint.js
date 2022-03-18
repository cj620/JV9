/*
 * @Author: C.
 * @Date: 2022-02-18 14:31:45
 * @LastEditTime: 2022-02-18 14:38:18
 * @Description: file content
 */
import axios from "axios";
export function printPdf(url) {
  const handlePrint = function (pdf) {
    if (document.getElementById("print-iframe")) {
      document.body.removeChild(document.getElementById("print-iframe"));
    }
    //判断iframe是否存在，不存在则创建iframe
    let iframe = document.getElementById("print-iframe");
    if (!iframe) {
      iframe = document.createElement("IFRAME");
      let doc = null;
      iframe.setAttribute("src", pdf);
      iframe.setAttribute("id", "print-iframe");
      iframe.setAttribute("style", "display:none");
      document.body.appendChild(iframe);
      doc = iframe.contentWindow.document;
      doc.close();
      iframe.contentWindow.focus();
    }
    iframe.contentWindow.print();
  };

  axios({
    url: url,
    method: "get",
    // params: { FileUrl: "/Pdf/c318763b-bcca-46d3-b77d-13269efd0543.pdf" },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    responseType: "arraybuffer", //一定要设置响应类型，否则页面会是空白pdf
  }).then((res) => {
    console.log(res);
    let pdfUrl = window.URL.createObjectURL(
      new Blob([res.data], { type: "application/pdf" })
    );
    if (pdfUrl) {
      handlePrint(pdfUrl);
    }
  });
}
