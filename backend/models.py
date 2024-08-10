# -*- coding: utf-8 -*-

from exts import db
from sqlalchemy.orm import Mapped, mapped_column


class Recipe(db.Model):
    """
    A class used to represent a recipe

    Attributes
    ----------
        id: int
            primary key
        title: str
        description: str
    
    Methods
    ----------
        save
        delete
        update
    """
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(
        db.String(),
        nullable=False
    )
    description: Mapped[str] = mapped_column(
        db.Text(),
        nullable=False
    )

    def __repr__(self):
        return f"<Recipe {self.title}>"

    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    def update(self, title, description):
        self.title = title
        self.description = description

        db.session.commit()

class User(db.Model):
    """
    
    """
    id: "Mapped[int]" = mapped_column(primary_key=True)
    username: "Mapped[str]" = mapped_column(unique=True)
    email: "Mapped[str]" = mapped_column()
    password: "Mapped[str]" = mapped_column(db.Text())

    def __repr__(self):
        return f"<User {self.username}>"
