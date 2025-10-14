export interface IPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
}


// {
//     "id": 34287328,
//     "width": 2560,
//     "height": 3840,
//     "url": "https://www.pexels.com/photo/portrait-of-an-elderly-man-with-distinctive-mustache-34287328/",
//     "photographer": "Ebahir",
//     "photographer_url": "https://www.pexels.com/@ebahir",
//     "photographer_id": 1173285862,
//     "avg_color": "#5B3F33",
//     "src": {
//         "original": "https://images.pexels.com/photos/34287328/pexels-photo-34287328.jpeg",
//         "large2x": "https://images.pexels.com/photos/34287328/pexels-photo-34287328.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
//         "large": "https://images.pexels.com/photos/34287328/pexels-photo-34287328.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
//         "medium": "https://images.pexels.com/photos/34287328/pexels-photo-34287328.jpeg?auto=compress&cs=tinysrgb&h=350",
//         "small": "https://images.pexels.com/photos/34287328/pexels-photo-34287328.jpeg?auto=compress&cs=tinysrgb&h=130",
//         "portrait": "https://images.pexels.com/photos/34287328/pexels-photo-34287328.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
//         "landscape": "https://images.pexels.com/photos/34287328/pexels-photo-34287328.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
//         "tiny": "https://images.pexels.com/photos/34287328/pexels-photo-34287328.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
//     },
//     "liked": false,
//     "alt": "Captivating portrait of a senior man sporting a unique thick mustache, seated indoors."
// },