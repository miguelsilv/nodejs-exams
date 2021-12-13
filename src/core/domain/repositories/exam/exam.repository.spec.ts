import { firstValueFrom, catchError } from "rxjs";
import { ExamMockRepository } from "../../../../data/exam/exam-mock.repository";
import { CreateExamDto } from "../../../../shared/dtos/exam/create-exam.dto";
import { CreatedExamDto } from "../../../../shared/dtos/exam/created-exam.dto";
import { ExamRepository } from "./exam.repository";


describe("ExamRepository", () => {
    let repository: ExamRepository;

    beforeEach(() => {
        repository = new  ExamMockRepository();
    });

    describe("Criar um novo exame", () => {

        it("Deve ter um id", async () => {
            const create = new CreateExamDto();
            create.name = "Exam A";
            create.type = "Type";

            const created = await firstValueFrom(repository.create(create));

            expect(created.id).not.toBeNull();
        });

        it("Deve retornar os campos iguais aos passados", async () => {
            const create = new CreateExamDto();
            create.name = "Exam A";
            create.type = "type";

            const created = await firstValueFrom(repository.create(create));

            expect(created.name).toEqual(create.name);
            expect(created.type).toEqual(create.type);
        });

        it("Deve ser um exame ativo ao cadastrar", async () => {
            const create = new CreateExamDto();
            create.name = "Exam Test 1";
            create.type = "type";

            const created = await firstValueFrom(repository.create(create));

            expect(created.isActive).toEqual(true);
        });
    });

    it("Obter uma lista de exames ativos", async () => {
        const exams = await firstValueFrom(repository.getAll());

        expect(exams.every(lab => lab.isActive)).toEqual(true);
    });

    describe("Atualizar um exame existente", () => {

        it("Não pode atualizar caso não exista", async () => {
            const update = new CreatedExamDto();
            update.name = "Novo nome";
            update.id = 999999999; // inexistente

            const updated = await firstValueFrom(repository.update(update.id, update).pipe(catchError((e) => [e])));

            expect(updated).toBeInstanceOf(Error);
        });

        it("Deve atualizar caso exista", async () => {
            const update = new CreatedExamDto();
            update.name = "Novo nome";
            update.id = 1;

            const updated: CreatedExamDto = await firstValueFrom(repository.update(update.id, update).pipe(catchError((e) => [e])));

            expect(updated).not.toBeInstanceOf(Error);
            expect(updated.name).toEqual(update.name);
            expect(update.type).not.toBeNull();
        });

    });

    describe("Remover um exame ativo", () => {

        it("A remoção deve ser logica", async () => {
            const id = 1;

            await firstValueFrom(repository.delete(id), { defaultValue: void (0) });

            const removed = (<CreatedExamDto[]>repository['db']).find(lab => lab.id === id);

            expect(removed.isActive).toEqual(false);
        });

        it("Não pode remover um exame que não existe", async () => {
            const id = 99999;

            const removed = firstValueFrom(repository.delete(id).pipe(catchError((e) => [e])), { defaultValue: void (0) });

            expect(await removed).toBeInstanceOf(Error);

        });

    });

});