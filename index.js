const myRow = document.querySelector("#myRow")
const form = document.querySelector("#newsForm")
const body = document.querySelector("body")
const getElement = (elementName, attrs = {}, father) => {
    const element = document.createElement(elementName);

    for (const attrsKey in attrs) {
        element[attrsKey] = attrs[attrsKey];
    }

    father && father.append(element);

    return element;
}


form.addEventListener('submit', async (e) => {
    e.preventDefault();

    word = form.news.value.trim();
    if (word === "") return;

    try {
        const res = await getInfo(word);


    } catch {
        console.log("error")
    }

})

const render = (data) => {

    myRow.innerHTML = "";
    const col = getElement("div", {className: "col-12  col-md-6 col-lg-6 my-3"}, myRow)
    const card = getElement("div", {className: "card d-flex border-0 overflow-hidden h-100"}, col);
    const links = getElement("h5", {className: "", innerHTML: `${data.name}`}, card);
    links.addEventListener('click', async (e) => {
        myRow.innerHTML = ''
        try {
            const res = await get21(links.innerHTML);
            console.log(res.data);
            const col = getElement("div", {className: "col-12  col-md-6 col-lg-6 my-3"}, myRow)
            const card = getElement("div", {className: "card d-flex border-0 overflow-hidden h-100"}, col);
            getElement("h5", {innerHTML: res.data.name}, card)
            getElement("h4", {innerHTML: `author: ${res.data.author}`}, card)
            getElement("h6", {innerHTML: `version: ${res.data.version}`}, card)
            const ver = res.data.assets[res.data.assets.length - 1];


        } catch {
            console.log("error")
        }
    })


}


body.onload = async () => {
    try {
        const info = await get20();
        info.data.results.map((item) => {
            const col = getElement("div", {className: "col-12  col-md-6 col-lg-6 my-3"}, myRow)
            const card = getElement("div", {className: "card d-flex border-0 overflow-hidden h-100"}, col);
            const links = getElement("h5", {className: " p-3 bg-primary w-50 rounded point shadow mb-4 ", innerHTML: `${item.name}`}, card);
            const cardF=getElement("div",{ className:"card-footer"},card)
            const links2 = getElement("h6", {className: "", innerHTML: `cdn : <br/>${item.latest}`}, cardF);
            const copy=getElement("button",{className:"btn btn-primary my-2 me-2",innerHTML:`<i class="fas fa-link"></i>`},cardF)
            copy.onclick=()=>{
                navigator.clipboard.writeText(item.latest);
            }
            const copy2=getElement("button",{className:"btn btn-primary my-2",innerHTML:`<i class="fas fa-code"></i>`},cardF)
            copy2.onclick=()=>{
                if (item.latest.includes(".css")){
                    navigator.clipboard.writeText( `<link href="${item.latest}" rel="stylesheet">`)
                }
                else{
                    navigator.clipboard.writeText(`<script src="${item.latest}"></script>`);
                }
            }

            links.addEventListener('click', async (e) => {
                myRow.innerHTML = ''
                try {
                    const res = await get21(links.innerHTML);

                   const goBack= getElement("a",{className:"btn btn-primary  m-3 fw-bold",innerHTML:"home",href:"index.html",style:"width:100px"},myRow)
                    const col = getElement("div", {className: "col-12 my-3"}, myRow)
                    const card = getElement("div", {className: "card d-flex border-0 overflow-hidden h-100"}, col);
                    getElement("h5", {className:"bg-primary w-25 p-3 rounded", innerHTML: res.data.name.toUpperCase()}, card)
                    getElement("h4", { className:"mt-4", innerHTML: `<span class="">Author :</span> ${res.data.author}`}, card)
                    getElement("h6", {className: "", innerHTML: `<span class="">Version</span> : ${res.data.version}`}, card)
                    getElement("h6", {className: "mb-5", innerHTML: `<span class="">Description : </span> ${res.data.description}`}, card)



                    const ver = res.data.assets[res.data.assets.length - 1];

                    const verra=Object.entries(ver.sri)

                    verra.map((item)=>{
                      const sriE=getElement("div",{className:"d-flex justify-content-between align-items-center py-2 px-4 my-2   rounded",style:"background-color:#2e3c50"},card);
                       const left=getElement("div",{className:" ",style:"flex:1"},sriE);
                       getElement("h5",{className:"",innerHTML:`${item[0]}`},left)
                       const right=getElement("div",{className:""},sriE);

                        const copy=getElement("button",{className:"btn btn-primary me-2",innerHTML:`<i class="fas fa-link"></i>`},right)
                        copy.onclick=()=>{
                            navigator.clipboard.writeText(item[0]);

                        }
                        const copy2=getElement("button",{className:"btn btn-primary my-2",innerHTML:`<i class="fas fa-code"></i>`},right)
                        copy2.onclick=()=>{
                            if (item[0].includes(".css")){
                                navigator.clipboard.writeText( `<link href="${item[0]}" rel="stylesheet">`)
                            }
                            else{
                                navigator.clipboard.writeText(`<script src="${item[0]}"></script>`);
                            }

                        }
                    })


                } catch {
                    console.log("error")
                }
            })

        })


    } catch (error) {
        console.warn(error);
    }
};