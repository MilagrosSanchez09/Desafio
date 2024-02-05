export const isAdmin = (req, res, next) => {
    const userRole = req.session?.user?.role;

    if (userRole !== 'admin') {
        return res.status(403).json({ error: 'Acceso no autorizado' });
    }

    next();
};

export const isUser = (req, res, next) => {
    const userRole = req.session?.user?.role;

    if (userRole !== 'usuario') {
        return res.status(403).json({ error: 'Acceso no autorizado' });
    }

    next();
};