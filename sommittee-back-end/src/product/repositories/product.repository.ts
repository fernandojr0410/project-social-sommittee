import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateProductDto } from "../dto/create-product.dto";
import { ProductEntity } from "../entities/product.entity";
import { UpdateProductDto } from "../dto/update-product.dto";

@Injectable()
export class ProductRepository {
  constructor(private prisma: PrismaService) { }


  // async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
  //   const { donor_id, ...productData } = createProductDto;

  //   const createdProduct = await this.prisma.product.create({
  //     data: {
  //       ...productData,
  //     },
  //   });

  //   const updatedProduct = await this.prisma.product.update({
  //     where: { id: createdProduct.id },
  //     data: {
  //       donor: {
  //         connect: { id: donor_id }
  //       }
  //     },
  //     include: {
  //       donor: true,
  //     },
  //   });

  //   return updatedProduct;
  // }


  async create(createProductDto: CreateProductDto) {
    const { donor, ...productData } = createProductDto;

    let connectedDonor;

    if (donor) {
      connectedDonor = await this.prisma.donor.findUnique({
        where: { cpf: donor.cpf },
      });
      if (!connectedDonor) {
        connectedDonor = await this.prisma.donor.create({
          data: donor,
        });
      }
    }

    return this.prisma.product.create({
      data: {
        ...productData,
        donor: connectedDonor
          ? { connect: { id: connectedDonor.id } }
          : undefined,
      },
    });
  }

  async findAll(query: any): Promise<ProductEntity[]> {
    const _query: any = {
      include: {
        donor: true,
      },
    };

    if (query.searchField && query.search) {
      _query.where = {
        [query.searchField]: {
          contains: query.search,
          mode: 'insensitive'
        }
      }
    }
    return await this.prisma.product.findMany(_query);
  }


  async findById(id: string): Promise<ProductEntity> {
    return await this.prisma.product.findFirst({
      where: { id },
      include: {
        donor: true,
      }
    })
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    const { donor_id, ...productData } = updateProductDto;

    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: {
        ...productData,
        ...(donor_id && { donor: { connect: { id: donor_id } } })
      },
      include: {
        donor: true
      }
    });

    return updatedProduct;
  }


  async remove(id: string): Promise<ProductEntity> {
    return await this.prisma.product.delete({ where: { id } })
  }
}