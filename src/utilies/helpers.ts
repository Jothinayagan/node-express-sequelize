const successResponse = (res: any, message: string) => res.status(200).send({ message });

const failureResponse = (res: any, error: string) => res.status(400).send({ message: error });

const validatePassword = (data: string) => {
    const isValid = data.match(/^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-]).{6,15}$/g);
    return isValid;
};
