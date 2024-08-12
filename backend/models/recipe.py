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
        """
        Insert a recipe
        following SQLAlchemy documentation: db.session.add(instance)

        Params
        ----------
            None
        
        Returns
        ----------
            None
        """
        db.session.add(self)
        db.session.commit()
    
    def delete(self):
        """
        Delete a recipe
        following SQLAlchemy documentation: db.session.delete(instance)

        Params
        ----------
            None
        
        Returns
        ----------
            None
        """
        db.session.delete(self)
        db.session.commit()
    
    def update(
        self,
        title: "str",
        description: "str"
    ):
        """
        Update a recipe
        following SQLAlchemy documentation: modify a instance corresponding to an entry

        Params
        ----------

            title str: new title of the recipe

            description str: new description of the recipe
        
        Returns
        ----------
            None
        """
        self.title = title
        self.description = description
        db.session.commit()
