const scrollAnimation = async (element: any, origin: string) => {
  if (element) {
    const scrollReveal = (await import("scrollreveal")).default;
    scrollReveal().reveal(element, {
      reset: true,
      delay: 200,
      duration: 1500,
      distance: "100px",
      origin: origin,
    });
    
  }
};

export default scrollAnimation;
