
jest.mock('redis', () => ({
    createClient: () => {
        return {
            connect: () => { },
            on: () => { },
            get: () => { },
            set: () => { }
        }
    }
})
)
