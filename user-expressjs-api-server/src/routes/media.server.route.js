class mediaRoutes {
    constructor(router){
    this.router = router;
    this.registerRoutes();
    }

    registerRoutes(){
       this.router
            .route('/medias/v1')
            .post()
    }
}

export default mediaRoutes;