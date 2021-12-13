import { firstValueFrom, catchError } from "rxjs";
import { LaboratoryMockRepository } from "../../../../data/laboratory/laboratory-mock.repository";
import { CreateLaboratoryDto } from "../../../../shared/dtos/laboratory/create-laboratory.dto";
import { CreatedLaboratoryDto } from "../../../../shared/dtos/laboratory/created-laboratory.dto";
import { LaboratoryRepository } from "./laboratory.repository";


describe("LaboratoryRepository", () => {
    let repository: LaboratoryRepository;

    beforeEach(() => {
        repository = new LaboratoryMockRepository();
    });

    describe("Criar um novo laboratório", () => {

        it("Deve ter um id", async () => {
            const create = new CreateLaboratoryDto();
            create.name = "Lab A";
            create.adress = "Rua A";

            const created = await firstValueFrom(repository.create(create));

            expect(created.id).not.toBeNull();
        });

        it("Deve retornar os campos iguais aos passados", async () => {
            const create = new CreateLaboratoryDto();
            create.name = "Lab A";
            create.adress = "Rua A";

            const created = await firstValueFrom(repository.create(create));

            expect(created.name).toEqual(create.name);
            expect(created.adress).toEqual(create.adress);
        });

        it("Deve ser um laboratório ativo ao cadastrar", async () => {
            const create = new CreateLaboratoryDto();
            create.name = "Lab Test 1";
            create.adress = "Rua Test 1";

            const created = await firstValueFrom(repository.create(create));

            expect(created.isActive).toEqual(true);
        });
    });

    it("Obter uma lista de laboratórios ativos", async () => {
        const laboratories = await firstValueFrom(repository.getAll());

        expect(laboratories.every(lab => lab.isActive)).toEqual(true);
    });

    describe("Atualizar um laboratório existente", () => {

        it("Não pode atualizar caso não exista", async () => {
            const update = new CreatedLaboratoryDto();
            update.name = "Novo nome";
            update.id = 999999999; // inexistente

            const updated = await firstValueFrom(repository.update(update.id, update).pipe(catchError((e) => [e])));

            expect(updated).toBeInstanceOf(Error);
        });

        it("Deve atualizar caso exista", async () => {
            const update = new CreatedLaboratoryDto();
            update.name = "Novo nome";
            update.id = 1;

            const updated: CreatedLaboratoryDto = await firstValueFrom(repository.update(update.id, update).pipe(catchError((e) => [e])));

            expect(updated).not.toBeInstanceOf(Error);
            expect(updated.name).toEqual(update.name);
            expect(update.adress).not.toBeNull();
        });

    });

    describe("Remover um laboratório ativo", () => {

        it("A remoção deve ser logica", async () => {
            const id = 1;

            await firstValueFrom(repository.delete(id), { defaultValue: void (0) });

            const removed = (<CreatedLaboratoryDto[]>repository['db']).find(lab => lab.id === id);

            expect(removed.isActive).toEqual(false);
        });

        it("Não pode remover um laboratório que não existe", async () => {
            const id = 99999;

            const removed = firstValueFrom(repository.delete(id).pipe(catchError((e) => [e])), { defaultValue: void (0) });

            expect(await removed).toBeInstanceOf(Error);

        });

    });

});