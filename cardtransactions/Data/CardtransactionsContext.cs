using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace cardtransactions.Data;

public partial class CardtransactionsContext : DbContext
{
    public CardtransactionsContext()
    {
    }

    public CardtransactionsContext(DbContextOptions<CardtransactionsContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Sale> Sales { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Sale>(entity =>
        {
            entity.ToTable("Sale");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Amount).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.CardType).HasMaxLength(10);
            entity.Property(e => e.Cardholder).HasMaxLength(1024);
            entity.Property(e => e.Currency).HasMaxLength(3);
            entity.Property(e => e.ExpireDate).HasMaxLength(4);
            entity.Property(e => e.Pan)
                .HasMaxLength(50)
                .HasColumnName("PAN");
            entity.Property(e => e.ResponseCode).HasMaxLength(2);
            entity.Property(e => e.Timestamp).HasColumnType("datetime");
            entity.Property(e => e.TransactionId).HasMaxLength(12);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
