export type Slide = {
  id:number;
  name: string;
  description: string;
  status: string;
  type: string;
  img: string;
  theme: {
    badge: string;
    highlight: string;
    button: string;
    glow: string;
  };
}
