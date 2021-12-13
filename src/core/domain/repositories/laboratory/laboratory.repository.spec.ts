import { throwError, firstValueFrom, Observable, of, NotFoundError } from "rxjs";
import { Laboratory } from "../../entities/laboratory/laboratory.entity";
import { LaboratoryRepository } from "./laboratory.repository";

class LaboratoryRepositoryTest implements LaboratoryRepository {
    private readonly laboratories: Laboratory[] = [];

    public create(laboratory: Laboratory): Observable<Laboratory> {
        if (laboratory == null) {
            return throwError(() => new Error("Não foi possivel cadastrar o laboratório."));
        }

        const last = this.laboratories.slice(-1);

        laboratory.id = last.length > 0 ? last[0].id + 1 : 1;

        this.laboratories.push(laboratory);
        return of(laboratory);
    }

    public getAll(): Observable<Laboratory[]> {
        return of(this.laboratories);
    }

    public update(id: number, laboratory: Partial<Laboratory>): Observable<Laboratory> {
        const index = this.getIndexById(id);

        if (index <= 0) {
            return throwError(() => new Error("Laboratório não encontrado."));
        }

        for (const key in laboratory) {
            this.laboratories[index][key] = laboratory[key];
        }

        return of(this.laboratories[index]);
    }

    public delete(id: number): Observable<void> {
        const index = this.getIndexById(id);

        if (index <= 0) {
            return throwError(() => new Error("Laboratório não encontrado."));
        }

        this.laboratories.splice(index, 1);

        return of();
    }

    private getIndexById(id: number) {
        return this.laboratories.findIndex(laboratory => laboratory.id == id);
    }
}

describe("LaboratoryRepository", () => {
    let repository: LaboratoryRepository;

    beforeEach(() => {
        repository = new LaboratoryRepositoryTest();
    });

    describe("Cadastrar um novo laboratório", () => {

        it("Deve ter um id", async () => {
            const laboratory = new Laboratory();
            laboratory.name = "Lab A";
            laboratory.adress = "Rua A";

            const result = await firstValueFrom(repository.create(laboratory));

            expect(result.id).not.toBeNull();
        });

        it("Deve retornar os campos iguais aos passados", async () => {
            const laboratory = new Laboratory();
            laboratory.name = "Lab A";
            laboratory.adress = "Rua A";

            const result = await firstValueFrom(repository.create(laboratory));

            expect(result.name).toEqual(laboratory.name);
            expect(result.adress).toEqual(laboratory.adress);
        });

        it("Deve ser um laboratório ativo ao cadastrar", async () => {
            const laboratory = new Laboratory();
            laboratory.name = "Lab A";
            laboratory.adress = "Rua A";

            const result = await firstValueFrom(repository.create(laboratory));

            expect(result.name).toEqual(laboratory.name);
            expect(result.adress).toEqual(laboratory.adress);
        });
    });

    // describe("Obter uma lista de laboratórios ativos", () => {

    // });

    // describe("Atualizar um laboratório existente", () => {

    // });

    // describe("Remover logicamente um laboratório ativo", () => {

    // });

});