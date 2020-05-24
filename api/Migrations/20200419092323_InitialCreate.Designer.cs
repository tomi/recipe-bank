﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using RecipeBankApi.Data;

namespace Api.Migrations
{
    [DbContext(typeof(RecipeContext))]
    [Migration("20200419092323_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("RecipeBankApi.Model.Recipe", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string[]>("Categories")
                        .HasColumnType("text[]");

                    b.Property<int>("Duration")
                        .HasColumnType("integer");

                    b.Property<string>("Instructions")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("NumPortions")
                        .HasColumnType("integer");

                    b.Property<string>("Tags")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Recipe");
                });

            modelBuilder.Entity("RecipeBankApi.Model.RecipeIngredient", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<long?>("IngredientId")
                        .HasColumnType("bigint");

                    b.Property<string>("IngredientText")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<decimal?>("MaxQuantity")
                        .HasColumnType("numeric");

                    b.Property<decimal?>("MinQuantity")
                        .HasColumnType("numeric");

                    b.Property<string>("Modifier")
                        .HasColumnType("text");

                    b.Property<int>("Order")
                        .HasColumnType("integer");

                    b.Property<long>("RecipeId")
                        .HasColumnType("bigint");

                    b.Property<string>("Unit")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("RecipeId");

                    b.ToTable("RecipeIngredient");
                });

            modelBuilder.Entity("RecipeBankApi.Model.RecipeIngredient", b =>
                {
                    b.HasOne("RecipeBankApi.Model.Recipe", null)
                        .WithMany("Ingredients")
                        .HasForeignKey("RecipeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
