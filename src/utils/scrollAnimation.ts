import scrollReveal from "scrollreveal";

const scrollAnimation = (element: any, origin: string) => {
  scrollReveal().reveal(element, {
    reset: true,
    delay: 200,
    duration: 2000,
    distance: "100px",
    origin: origin,
  });
};


export default scrollAnimation