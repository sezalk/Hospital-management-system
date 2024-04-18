//to handle errors we make Middle

export const catchAsyncErrors = (theFunction)=>{
    return (req,res,next)=>{
        Promise.resolve(theFunction(req,res,next)).catch(next);
    };
};
