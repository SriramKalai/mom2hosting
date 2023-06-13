/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.{html,js}"],
  theme: {
    extend: {    
    colors: {
      'logo': '#0D6EFD',
      'brand':'#8CB7F5',
      'menutext':'#1C1C1C',
      'rating-color':'#FF9017',
      'shipping':'#00B517',
      'detail':'#0D6EFD',
      'textsee':'#0D6EFD',
      "summa":'#ffffff'
    },
    width: {
      '920': '920px',
      '210':'210px',
      '607':'550px',
      '295':'295px',
      '230':'230px',
      '920':'920px',
      '44px':'44px',
      '150':'150px',
      '421':'421px',
      '145':'145px',
      '100':'100px',
      
    },
    height: {
      '210': '210px',
      '405':'405px',
      '230':'230px',
      '46':'46px',
      

    },
    gridTemplateColumns: {
      'three': 'repeat(3, minmax(0, 1fr))',
    },
    margin: {
      't4px': '5px',
      'l48':'48px',
      '96':'96px',
      'm5':'-5px'
    },
    fontFamily:{
      "inter":['Inter']
    },
    screens: {

      'md': '580px',
      'sd':'500px'
    }
  },
  
  

  },
  plugins: [],
}

