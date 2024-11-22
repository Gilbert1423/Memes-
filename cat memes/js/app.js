document.addEventListener('DOMContentLoaded', function(){
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');


    const api_key = 'live_BS5KrJxSZu6ohtQvRUMUSvzc4os75G99BfQZ9hzLZPfAJ5CB0X3k1WEGu0UpxSrj'
    let image = new Image();
    
    document.getElementById('generar').addEventListener('click', getCatImage);
    document.getElementById('actualizar').addEventListener('click', addtext);
    async function getCatImage(){
        try{
            const response = await fetch (` https://api.thecatapi.com/v1/images/search?api__key=${api_key}`)
            .then(response => response.json())
            .then (datos =>{
                image.src = datos [0].url
                addImage();
                //document.getElementById('img').src = datos[0].url
            })

        } catch(error){
            console.log(error)
        }
    }
    function addImage(){
        image.addEventListener('load', () =>{
            const relacion_de_aspecto = image.width / image.height;
            const maxWidth = window.innerWidth * 0.8;
            const maxHeight = window.innerHeight * 0.8;
            
            let canvasWidth, canvasHeight;

            if(maxWidth / maxHeight < relacion_de_aspecto){
                canvasWidth = maxWidth
                canvasHeight = maxWidth / relacion_de_aspecto
            }else{
                canvasWidth = maxHeight *relacion_de_aspecto
                canvasHeight = maxHeight;
            }
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight)
            addtext()
        })
    }

    function addtext(){
        const text = document.getElementById('texto').value;
        const size = document.getElementById('size').value;
        const color = document.getElementById('color').value;
        
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
        
        ctx.fillStyle = color
        ctx.font = `${size}px 'Kablammo'`;
        ctx.textAlign = 'center';
        ctx.fillText(text,canvas.width / 2, canvas.height * 0.75)

    }
})