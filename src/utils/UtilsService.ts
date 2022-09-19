import UtilsRepository from "./UtilsRepository";

const UtilsService = {
    relationshipExists: async (teacherId: number, disciplineId: number) => {
        
        const relationship = await UtilsRepository.relationshipExists(teacherId, disciplineId);

        if(relationship === null){
            throw { type: 'not_found', message: 'Relationship Not Found!'}
        }

        return relationship;
    }
};

export default UtilsService;